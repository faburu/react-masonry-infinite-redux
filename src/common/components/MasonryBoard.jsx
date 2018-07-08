import React from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

class MasonryBoard extends React.Component {
    state = { hasMore: true }
    componentDidMount() {
        // go to top of doc
        window.scrollTo(0, 0);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // only when redux state hasMore is updated do we update hasMore here
        if (prevProps.hasMore !== this.props.hasMore) this.setState({ hasMore: (this.props.hasMore > 0) });
    }
    render() {
        // these props were injected into the state in SSR
        const { maxMasonryWidth, cardWidth, gutter } = this.props.masonryBoard;
        // automatically generate media queries based on card width
        var mqArr = [{ columns: 1, gutter }]
        for (var mq = (cardWidth + gutter) * 2, i = 1; mq < maxMasonryWidth; mq += cardWidth + gutter * 2) {
            mqArr.push({ mq: mq + 'px', columns: ++i, gutter });
        }
        return (
            <div style={{ margin: '0 auto' }}>

                <MasonryInfiniteScroller
                    className="masonry-board"
                    pack={true}
                    hasMore={this.state.hasMore}
                    pageStart={1}
                    style={{ backgroundColor: "#000", margin: '10px auto' }}
                    loader={(<div>loading...</div>)}
                    sizes={mqArr}
                    loadMore={page => {
                        console.log(page);
                        this.props.fetchCards(page);
                        // stop page count until some outside force (componentDidUpdate)
                        this.setState({ hasMore: false });
                    }}
                >
                    {
                        this.props.cards.map((card, i) =>
                            <div
                                key={i}
                                style={{
                                    width: card.width,
                                    height: card.height,
                                    backgroundColor: '#567',
                                    padding: '10px',
                                    boxSizing: 'border-box'
                                }}
                            >{i + 1}</div>
                        )
                    }
                </MasonryInfiniteScroller>
            </div>
        )
    }
}

export default MasonryBoard;