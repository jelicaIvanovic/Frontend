import React, {Component} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import qs from 'qs';
class FormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marketType: "1x2",
            prediction: "1",
            eventId: null,
            number1: null,
            number2: null,
            submission : null
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    handleSubmit(event) {
        event.preventDefault();

        let prediction = this.state.prediction;
        let text = "Server error! Please try again later!";
        let message = document.getElementById("message");

        if (this.state.marketType == 'correct_score') {
            prediction = this.state.number1 + ':' + this.state.number2
        }

        let data = qs.stringify({
            prediction: prediction,
            market_type: this.state.marketType,
            event_id: this.state.eventId
        });

        axios.post(process.env.REACT_APP_API_URL + `/v1/predictions`, data, {
                crossdomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .then(res => {
                this.setState({submission : true});
                message.innerHTML = "Your prediction is successfully added!";
                document.getElementById("prediction-form").reset();
                this.setState({marketType: "1x2"});
                this.props.refreshList();
            }).catch((error) => {
            if (error.response) {
                 switch (error.response.status) {
                    case 422 :
                        text = "Server error! " + error.response.data;
                        break;
                     case 500 :
                         text = "Internal server error! Please try again later!";
                         break;
                    default :
                        break;
                }
                message.innerHTML = text;
                document.getElementById("prediction-form").reset();
                this.setState({marketType: "1x2", submission: false});
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request.status);
                console.log(error.status);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
                this.setState({submission : false});
            }
            console.log(error.config);
        });


    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let {marketType, submission} = this.state;
        return (
            <div className="form-section">
                <h2 className='section-title'>Add new prediction</h2>
                <Form id="prediction-form" className="prediction-form" onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group controlId="form-event-id">
                        <Form.Label>Event Id</Form.Label>
                        <Form.Control required type="number" name='eventId' placeholder="Enter Event Id"
                                      onChange={e => this.onChange(e)}/>
                    </Form.Group>
                    <Form.Group controlId="form-market-type">
                        <Form.Label>Prediction Type</Form.Label>
                        <Form.Control as="select" name="marketType" onChange={e => this.onChange(e)} value={marketType}>
                            <option value="1x2">3 Way result</option>
                            <option value="correct_score">Correct Score</option>
                        </Form.Control>
                    </Form.Group>
                    {marketType === "1x2" ?
                        <Form.Group>
                            <Form.Label>Prediction</Form.Label>
                            <Form.Control as="select" name="prediction" onChange={e => this.onChange(e)}>
                                <option>1</option>
                                <option>2</option>
                                <option>X</option>
                            </Form.Control>
                        </Form.Group> :

                        <Form.Row>
                            <Form.Label>Enter Score</Form.Label>
                            <Form.Group as={Col} md="2" xs="4" controlId="number1">
                                <Form.Control required inline type="number" name='number1' min="0"
                                              onChange={e => this.onChange(e)}/>
                            </Form.Group>
                            <div as={Col} md="1" xs="1">:</div>
                            <Form.Group as={Col} md="2" xs="4" controlId="number2">
                                <Form.Control required inline type="number" name='number2'min="0"
                                              onChange={e => this.onChange(e)}/>
                            </Form.Group>
                        </Form.Row>
                    }
                    <Button variant="primary" type="submit">
                        Add Prediction
                    </Button>

                    <div id="message" className={submission ? "message success" : "message error"}></div>

                </Form>
            </div>

        );
    }
}


export default FormComponent;
