import React from 'react';

class Animal extends React.Component {
    componentDidMount() {
        // console.log(this.props)
        // this loads once the app is client-side
        // determine what the user is looking for,
        // determine if it's already in the state
        // and if you don't have it, dispatch actions to get it
        // [] there should also be an action and logic to get whole list
    }
    render() {
        const { addAnimal, animals } = this.props;
        return (<div>
            <div>
                Current animals;
                <ul>
                    {animals && animals.map((animal, i) => (<li key={i}>{animal.species}</li>))}
                </ul>
            </div>
            <button onClick={() => addAnimal({ species: 'rabbit' })} >Add rabbit</button>
        </div>)
    }
}



export default Animal