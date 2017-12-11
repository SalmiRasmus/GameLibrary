import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.deleteGame = this.deleteGame.bind(this);
        this.createGame = this.createGame.bind(this);
        
        this.handleGameEdit = this.handleGameEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
        
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeRelease = this.onChangeRelease.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        
        this.editGameSubmit = this.editGameSubmit.bind(this);

        this.state = {games: [], isEdit: false, title: '', company: '', release: '',
        			price: '', description: '', href: ''};
    }

    componentDidMount() {
        this.loadGamesFromServer();
    }
    loadGamesFromServer() {
        fetch('http://localhost:8080/api/games',
            {credentials: 'same-origin'})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    games: responseData._embedded.games,
                });
            });
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(
            "Title: " + this.state.title +
            ", Company: " + this.state.company +
            ", Release: " + this.state.release +
            ", Price: " + this.state.price +
            " and Description: " + this.state.description
        );
        var newGame = {
            title: this.state.title,
            company: this.state.company,
            release: this.state.release,
            price: this.state.price,
            description: this.state.description
        };

        this.createGame(newGame);
        this.refs.titleInput.value='';
        this.refs.companyInput.value='';
        this.refs.releaseInput.value='';
        this.refs.priceInput.value='';
        this.refs.descriptionInput.value='';
    }

    editGameSubmit(game) {
    	game.preventDefault();
        fetch(this.state.href, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                title: this.state.title,
                company: this.state.company,
                release: this.state.release,
                price: this.state.price,
                description: this.state.description,
            })
        }).then(
            res => this.loadGamesFromServer()
        )
            .catch(err => console.error(err))
        this.setState({isEdit: false});
        this.refs.titleInput.value='';
        this.refs.companyInput.value='';
        this.refs.releaseInput.value='';
        this.refs.priceInput.value='';
        this.refs.descriptionInput.value='';

    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }
    onChangeCompany(e) {
        this.setState({company: e.target.value});
    }
    onChangeRelease(e) {
        this.setState({release: e.target.value});
    }
    onChangePrice(e) {
        this.setState({price: e.target.value});
    }
    onChangeDescription(e) {
        this.setState({description: e.target.value});
    }

    deleteGame(game) {
    	fetch(game._links.self.href,
    			{
    			method: 'DELETE',
    			credentials: 'same-origin'
    			}) 
    		.then(res => this.loadGamesFromServer())
            .then(() => {
                Alert.success('Game deleted', {
                    position: 'bottom-left',
                    effect: 'slide'
                });
            })
            .catch(err => console.error(err))
    }

    handleGameEdit(game) {
        this.setState({
            isEdit: true,
            title: game.title,
            company: game.company,
            release: game.release,
            price: game.price,
            description: game.description,
            href: game._links.self.href
        })
    }

    createGame(game) {
        fetch('http://localhost:8080/api/games',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game)
            })
            .then(
                res => this.loadGamesFromServer()
            )
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <GameTable deleteGame={this.deleteGame}
                           handleGameEdit={this.handleGameEdit}
                           games={this.state.games}
                           editGames={this.state.games}/>
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Write a new game</div>
                        <div className="panel-body">
                            {!this.state.isEdit ?

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <input type="text"
                                               ref="titleInput"
                                               placeholder="Title"
                                               className="form-control"
                                               name="title"
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group row">
                                        <input type="text"
                                               ref="companyInput"
                                               placeholder="Company"
                                               className="form-control"
                                               name="company"
                                               onChange={this.handleChange}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="date"
                                               ref="releaseInput"
                                               placeholder="Release"
                                               className="form-control"
                                               name="release"
                                               onChange={this.handleChange}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="string"
                                               ref="priceInput"
                                               placeholder="Price"
                                               className="form-control"
                                               name="price"
                                               onChange={this.handleChange}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="text" 
                                        		ref="descriptionInput"
                                               placeholder="Description"
                                               className="form-control"
                                               name="description"
                                               onChange={this.handleChange}/>
                                    </div>

                                    <div className="form-group row">
                                        <button className="btn btn-primary center-block"
                                                onClick={this.handleSubmit}>Save the game
                                        </button>
                                    </div>
                                </form>
                                :
                                <form onSubmit={this.editGameSubmit}>
                                    <div className="form-group row">
                                        <input type="text"
                                               value={this.state.title}
                                               placeholder="Title"
                                               className="form-control"
                                               onChange={this.onChangeTitle}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="text"
                                               value={this.state.company}
                                               placeholder="Company"
                                               className="form-control"
                                               onChange={this.onChangeCompany}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="date"
                                               value={this.state.release}
                                               placeholder="Release"
                                               className="form-control"
                                               onChange={this.onChangeRelease}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="number"
                                               value={this.state.price}
                                               placeholder="Price"
                                               className="form-control"
                                               onChange={this.onChangePrice}/>
                                    </div>

                                    <div className="form-group row">
                                        <input type="text"
                                               value={this.state.description}
                                               placeholder="Description"
                                               className="form-control"
                                               onChange={this.onChangeDescription}/>
                                    </div>

                                    <div className="form-group row">
                                        <button className="btn btn-primary center-block"
                                                onClick={this.editGameSubmit}>Update the game
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

class GameTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var games = this.props.games.map(game =>
            <Game key={game._links.self.href}
            	game={game}
                  deleteGame={this.props.deleteGame}
                  handleGameEdit={this.props.handleGameEdit}/>
        );

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Release</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{games}</tbody>
                </table>
            </div>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.deleteGame = this.deleteGame.bind(this);
        this.handleGameEdit = this.handleGameEdit.bind(this);
    }

    deleteGame() {
        this.props.deleteGame(this.props.game);
        console.log(this.props.game);
    }

    handleGameEdit() {
        this.props.handleGameEdit(this.props.game);
    }

    render() {
        return (
            <tr>
                <td>{this.props.game.title}</td>
                <td>{this.props.game.company}</td>
                <td>{this.props.game.release}</td>
                <td>{this.props.game.price}</td>
                <td>{this.props.game.description}</td>
                <td>
                    <button
                        className="btn btn-primary btn-xs"
                        onClick={this.handleGameEdit}>Update this game
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-danger btn-xs"
                        onClick={this.deleteGame}>Delete this game
                    </button>
                </td>
            </tr>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));