import './feed.css';


const Feed = ({title, list, panel, extras: createDatePicker}) => {
    return (
        <div className="feed">
            <h1 className="feed-heading">{title}</h1>
            {createDatePicker && createDatePicker()}
            {list && list.length>0 ? list.map(panel)
                : <p>NOTHING FOUUUUND</p>}
        </div>
    )
}

export default Feed;