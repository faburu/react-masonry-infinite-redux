const defaultState = require('./defaultState');

export default page => {
    return new Promise((resolve) => {
        if (!page) page = 1;
        const heightDiff = defaultState.masonryBoard.cardMaxHeight - defaultState.masonryBoard.cardMinHeight;
        const cardHeight = () => Math.floor(Math.random() * heightDiff) + defaultState.masonryBoard.cardMinHeight;
        const hasMore = defaultState.api.totalRecords - (defaultState.api.skip * page);
        const records = Math.min(defaultState.api.skip, defaultState.api.skip + hasMore);

        let cards = []
        if (records > 0) for (var i = 0; i < records; i++) {
            cards.push({
                id: Math.floor(Math.random() * Date.now()).toString(36),
                width: defaultState.masonryBoard.cardWidth,
                height: cardHeight()
            })
        }

        setTimeout(() => resolve({ cards, hasMore, records, page }), defaultState.api.responseTime);
    });
}

// api(9).then(result => console.log(result));