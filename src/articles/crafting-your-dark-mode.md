---
slug: "/posts/crafting-your-dark-mode"
date: "2021-10-25"
title: "Crafting Your Dark Mode"
---

# Crafting Your Dark Mode

![A snippet of this website's dark mode.](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif "dark-mode-snippet")

## Preface

Adding a dark mode is a great way to keep your sight friendly to as many users as possible. A [survey published on Medium by Thomas Steiner](https://medium.com/dev-channel/let-there-be-darkness-maybe-9facd9c3023d) shows 82.7% of the participants were using dark mode. They further state there is a bias in their audience which should be considered. But that aside it does show there is a desire for dark mode to be supported, especially if the target audience contains technologically involved individuals. So the question remains... How do I add a dark mode to my site? Well you've come to the right place. I'll discuss some of the tricks I've used to keep this process clean!

## Taking on a new style

Don't worry there is no need to throwaway any existing styles your site has when incorpoarting a dark mode alternative. At worst there is a little restructuring, but don't worry it'll help make your CSS code cleaner and more maintainable.

### CSS Variables

The difficulty in creating a dark mode arises when we need to switch between a light and dark theme and we don't want to be hard-coding our colours in every component we use. This is where our saviour [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) come in. As a side note CSS Variables are supported on all major browsers except Internet Explorer (of course!). Basically, CSS Variables do what they say on the tin, they let us define custom properties for re-use throughout our site.

```css
.parent {
    --background-color: rgb(255, 0, 0);
}

.parent .child {
    background-color: var(--background-color);
}
```

So what does this code mean? Well we've declared our custom property in the `.parent` class, and then set the `background-color` property of our `.child` class. And now our child will have a red background. How does this work? A CSS Variable will propogate down the [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) tree from the element it is declared on. That means we can only access that variable from the element it is declared on and any children no matter how far down the tree they are.

### Root Pseudo-class

How do declare a variable so it accessible to all our elements, like we would want to do with a dark mode? Well that's easy. To apply the style to everything we can simply declare the variable on the [root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) node.

```css
:root {
    --background-color: rgb(0, 255, 0);
}
```

We have declared our custom property on the root node, using the `:root` pseudo-class. Now any element in our document can access our property. A step in the right direction but we need to be able to change this variable if we want to have a different value for our light and dark themes.

### Light vs Dark

The trick I used on this website is to instead define our variables inside a class but place at the top of the DOM tree.

```css
html.light {
    --background-color: rgb(255, 255, 255);
}

html.dark {
    --background-color: rgb(0, 0, 0);
}
```

By defining our classes on our `html` element it is still accessible by all the areas of the document we will target and when we change the class of the `html` element from `.light` to `.dark` the custom properties value will also change. _You should note, if no class is present on the `html` element then the custom property will be undefined._

<br>

**You should expand these classes to incorporate all the desired styles for your website.**

## The Toggle

Next up, we need to create a toggle to switch between our themes. You may have noticed the one at the top of the site, I'd encourage you to have a play and take some inspiration from it.

### Marking it Up

As an initial step I planned what I wanted my toggle to look like. After looking at how it was done in other sites I settled on a "Sun" that would transform into a "Moon". I wanted it to be a fast and sleek transition but still fit in with the feel of the rest of my website's design.

<br>

I first incorporated the HTML that would be used to style up the "Sun" and "Moon".

```html
<span id="satellite" class="satellite">
    <span class="ray"></span>
    <span class="ray"></span>
    <span class="ray"></span>
    <span class="ray"></span>
    <span class="ray"></span>
    <span class="ray"></span>
    <span class="cutout"></span>
</span>
```

The `satellite` `span` will represent the body of "Sun" and "Moon", however with the "Sun" I also wanted some `rays` to animate out of it. That's were each of the child `spans` come into play. But I also wanted the "Moon" to be a crescent, and the easiest way to do that is have another smaller `span` intersect it. Just seeing the HTML makes it hard to visualize so I'll move on to styling to hopefully start to build a better picture of how it all comes together.

### Getting Stylish

Let's start with a bit of boilerplate. Remember CSS Variables, I hope so!

```css
:root {
    --satellite-size: 0.75rem;
}
```

This variable will control the `height` and `width` properties of the toggle, having a custom property control this helps us tweak it to fit nicely into our page later on. We want both these properties to be equal in order to get a perfect circle. I found `0.75rem` works nicely for my setup but you may want to change this to suit you.

<br>

Let's get into the good bits. We'll get the main body styled up like so.

```css
span.satellite {
    display: inline-block; /* Set this so we can set the width and height of the element. */
    position: relative; /* This will come in later. */

    width: var(--satellite-size);
    height: var(--satellite-size);

    background: var(--header-color); /* Set based on whether we are in light or dark mode. */
    border-radius: 50%; /* We have a circle! */

    cursor: pointer; /* We want to click on this, so I'll show the user! */

    transition: all 150ms ease 150ms; /* Transitions all properties for 150ms using the `ease` timing function, and delays the start of the animation for 150ms. Stick with me, you'll see why!  */
}
```

Okay, that's a fair bit to unpack. I've added some comments so you can see what each line is doing. Simply, we are setting up some stuff for later; and creating a circle out of our `span`. Next we'll get each of the `rays` for the "Sun" sorted.

```css
span.ray {
    display: block; /* Takes into account margins etc.. */

    position: absolute; /* So we can position the spans in relation to there parent easily */
    top: 50%;
    left: 50%;

    width: calc(var(--satellite-size) / 3); /* A ray is 1/3 the size of the `satellite's` size. */
    height: calc(var(--satellite-size) / 3);

    background: var(--header-color); /* Same color as the `satellite`. */
    border-radius: 50%; /* We have a circle! */

    margin: calc(var(--satellite-size) / 6 * -1); /* A bit of magic to align the `rays` origin around the `satellite's` center. */

    transition: transform 300ms ease; /* We'll setup a transition for animating the `rays` `transform` later. */
}
```

Magnifique, we're getting there. Our rays are the right shape are setup properly but they are all in the same position. To take care of this we'll go through each element and rotate it. This will take a bit of elbow grease since we're doing this in plain CSS and not a fancy preprocessor like [Less](https://lesscss.org/). We use the [`nth-of-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type) pseudo-class to select a `ray` but it's occurance in the DOM tree and rotate it by different amounts.

```css
span.ray:nth-of-type(1) {
    transform: rotate(60deg) translate(var(--satellite-size));
}

span.ray:nth-of-type(2) {
    transform: rotate(120deg) translate(var(--satellite-size));
}

span.ray:nth-of-type(3) {
    transform: rotate(180deg) translate(var(--satellite-size));
}

span.ray:nth-of-type(4) {
    transform: rotate(240deg) translate(var(--satellite-size));
}

span.ray:nth-of-type(5) {
    transform: rotate(300deg) translate(var(--satellite-size));
}

span.ray:nth-of-type(6) {
    transform: rotate(0deg) translate(var(--satellite-size));
}
```

Here we rotate each span by 60 degrees to evenly space them around the body (`360 / 6 = 60`), and then we translate them out diagonally by the size of the `satellite` to maintain a proportional gap from it. And with that the "Sun" is looking more like it is supposed to.

<br>

And now we'll move on to the cutout that will be used to give the illusion a crescent moon. The styles for it are pretty similar to what we've seen before, the magic comes later when we set up the transitions.

```css
span.cutout {
    position: absolute; /* So we can position this relative to the parent element */

    width: var(--satellite-size);
    height: var(--satellite-size);

    background: var(--background-color); /* Note we want this to be the same as the background to cut into the `satellite` */
    border-radius: 50%; /* We have a circle! */

    transform: translate(-8rem, 0); /* Move it horizontally out of the way at first */
    opacity: 0; /* We also want to hide it so it can appear after we transition between light and dark mode */

    z-index: 1; /* This lets the cutout sit on top of the parent element */

    transition: transform 150ms ease 150ms; /* Note only the transform because we want the opacity to pop in */
}
```

We can't see much here obviously, but we have created an "invisible" circle that we will use when we toggle to and from dark mode.

### Easing in to it

Now we've got the base styles out of the way, we want to create some behaviour to transition into. The method I have elected to is looking for a specific class that we will later add and remove in our Javascript. The jist of it is to hide then "Sun's" rays first and then somehow make it into a "Moon". We'll do the latter by sliding the cutout on top of it and making the "Sun" grow into a "Moon". Luckily, we've already got the timing down in the previous section. If you look back we set a delay on the transition for `satellite` and `cutout`. This is because we want to wait until the rays have been hidden before becoming a "Moon". Let's hide the rays then, we'll assume when we want to transition to dark mode an `.on` class is added to the parent element `satellite`.

```css
span.satellite.on span.ray {
    transform: rotate(0deg) translate(0); /* This moves all the rays back to the centre of the `satellite` were they are hidden behind it. */
}
```

That is simple enough and CSS take cares of all the details of getting from one point to the other smoothly. That's handy! So next we'll slide in the `cutout` and grow the `satellite` to fit nicely where the "Sun" was. We do this as the `rays` of the "Sun" took up some extra space that we can utilise now they are hidden.

```css
span.satellite.on {
    width: calc(var(--satellite-size) * 1.5); /* Makes this element 50% larger. */
    height: calc(var(--satellite-size) * 1.5);
}

span.satellite.on span.cutout {
    opacity: 1; /* Make this element visible again. */
    transform: translate(0); /* Remove the default offset so it eats into the newly enlarged `satellite`. */
}
```

And now if we were to add that CSS to our HTML, we can see the "Sun" rays hide and transform into a "Moon". I've noticed it almost gives the effect of a sphere rotating as the `cutout` slides in. I like how it's looking. But we're not done yet! We've still got to make it interactive!

### Scripting

Here we go, making the toggle interactive is easier than you'd think. The DOM has plenty of nice abstractions we can use to switch our themes and trigger all the transitions we have set up. Mainly, the [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) of a HTML element. How do we do it? Well we want to trigger the a `toggle` function on the click event on the `satellite span` element. I'll go ahead a stick the whole function below as it is relatively simple.

```javascript
function toggle() {
    const satellite = document.getElementById("satellite"); // get `satellite` element by it's `id` attribute.
    satellite.classList.toggle("on"); // adds or removes the `.on` class to the element based on whether it is already in the class list.

    const rootClassList = document.documentElement.classList;
    rootClassList.toggle("light");
    rootClassList.toggle("dark");
}
```

```jsx
<span id="satellite" className="satellite" onClick={toggle}>
    ...
</span>
```

Now we are have a fully functioning dark mode toggle. When we click the `satellite` element we trigger the `toggle` function that toggles the `.on` class on our `satellite` element and changes the `documentElement` class between `.light` and `.dark`. The benefit of relying on the `classList` API to manage which mode we are currently in is that we have no responsibility of managing state ourselves in Javascript. This prevents our logic and document from getting out of sync with one another.

<br>

If you're following along, you may have noticed an issue when toggling dark mode on and off. Some elements will have transitions and some do not. You can fix this by either setting default transitions for all elements in your list but that can cause conflicts if we use it elsewhere for other effects. The solution I've come up with is a slightly ugly one, but functional. _It also should be used with caution as it overwrites existing CSS and can cause unforseen side effects_. So with the warnings out of the way, my solution was to create a `.transition` class and add it to the `documentElement` so it's styles propagate down. You'll get a better idea if I show you the code.

```css
/* Targets element and all children. */
.transition,
.transition * {
    transition: all 300ms ease 0ms !important; /* !important prioritises this property in the CSS hierarchy. */
}
```

```javascript
function toggle() {
	...

	const rootClassList = document.documentElement.classList;
    rootClassList.toggle("light");
    rootClassList.toggle("dark");

	// New stuff!
	rootClassList.add("transition");
	setTimeout(() => rootClassList.remove("transition"), 301); // Remove class after 301ms as our transitions last 300ms so it should be seamlessly removed.
}
```

This ensures when we `toggle` dark mode, we transition all elements gradually from one theme to the next. I think it's a nice finishing touch to make the toggle feel that much smoother!

## Expanding our Code

There's an almost limitless amount of tweaks we can make to improve the dark mode toggle. I am writing this blog at the time of it's initial creation and I'm sure over time it will be iterated on, so feel free to check out the source code for this blog on my [GitHub](https://github.com/oliverroyknox/blog) page and see the latest versions. I also encourage you to try this out and improve it to find what you want your unique `toggle` to look like. I'm sure you can come up with some creative toggle's that really enhance your site!
