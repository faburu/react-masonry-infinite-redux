import React from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

const MasonryBoard = props => {
    // these props were injected into the state in SSR
    const { maxMasonryWidth, cardWidth, gutter } = props.masonryBoard;
    const { hasMore, fetchCards, setHasMore } = props;
    // automatically generate media queries based on card width
    var mqArr = [{ columns: 1, gutter }];
    for (var mq = (cardWidth + gutter) * 2, i = 1; mq < maxMasonryWidth; mq += cardWidth + gutter * 2) {
        mqArr.push({ mq: mq + 'px', columns: ++i, gutter });
    }
    return (
        <div style={{ margin: '0 auto' }}>
            <MasonryInfiniteScroller
                className="masonry-board"
                pack={true}
                hasMore={hasMore}
                pageStart={1}
                style={{ backgroundColor: "#000", margin: '10px auto' }}
                loader={(<div key={1}>loading...</div>)}
                sizes={mqArr}
                loadMore={page => {
                    console.log(page);
                    fetchCards(page);
                    // stop page count until some outside force (componentDidUpdate)
                    setHasMore(false);
                }}
            >
                {
                    props.cards.map((card, i) =>
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

export default MasonryBoard;