import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import ContentTable from './Table.jsx';
import FormComponent from './Form.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            predictions: []
        }
    }

    componentDidMount() {
        this.refreshPredictionsList();
    }

    componentDidUpdate() {

    }

    refreshPredictionsList() {
        axios.get( process.env.REACT_APP_API_URL + `/v1/predictions`, {crossdomain: true}
        ).then(res => {
                const predictions = res.data;
                this.setState({predictions});
            }
        )
    }


    componentWillUnmount() {
    }

    render() {
        let {predictions} = this.state;
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2 className='section-title'>Predictions</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col><ContentTable predictions={predictions}/></Col>
                    </Row>
                    <Row>
                        <Col><FormComponent refreshList={this.refreshPredictionsList.bind(this)}/></Col>
                    </Row>
                </Container>

            </div>

        );
    }
}


export default Home;