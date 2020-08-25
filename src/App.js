import React from 'react';
import './App.css';
import Form from './components/Form';
import Body from './components/Body';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            error: null,
            htmlText: '',
        };
    }

    fetchHtmlDocument = url => {
        this.setState({
            isFetching: true,
        });
        fetch(url, {
            method: 'GET',
            'Content-type': 'text/html',
        })
            .then(response => response.text())
            .then(data => {
                    this.setState({
                        htmlText: data,
                        isFetching: false,
                    });
                },
                (error) => {
                    this.setState({
                        isFetching: false,
                        error,
                    });
                });
    };

    handleSubmit = ({values: {urlValue}}) => {
        this.fetchHtmlDocument(urlValue);
    };

    render() {
        const {htmlText, isFetching} = this.state;
        return (
            <article>
                <Form onSubmit={this.handleSubmit}/>
                <section>
                    <h1>HTML</h1>
                    {isFetching ? <div className="loader"/> : <Body main={htmlText}/>}
                </section>
            </article>
        );
    }
}

export default App;
