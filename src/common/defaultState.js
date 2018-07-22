// include all program settings
module.exports = {
    // could elaborate on routes object for data-fetching, but just using for menu
    routes: [
        {name: 'Home', path: '/'},
        {name: 'Animal', path: '/animal/    '},
    ],
    headers: {
        title: 'starter'
    },
    animals: [],
    masonryBoard:  {
        maxMasonryWidth: 1024,
        gutter: 5,
        cardWidth: 250,
        cardMinHeight: 200,
        cardMaxHeight: 400
    },
    hasMore: false,
    api: {
        totalRecords: 95,
        responseTime: 1000,
        skip: 10
    }
}