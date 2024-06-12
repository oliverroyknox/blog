exports.createPages = async ({ actions }) => {
    const { createRedirect } = actions;

    createRedirect({
        fromPath: `/product/*/foo`,
        toPath: `/product/*`,
    });
};
