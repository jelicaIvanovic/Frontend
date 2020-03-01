import React, {Component} from 'react';
import {Table} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

class ContentTable extends Component {

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Event Id</th>
                        <th>Prediction</th>
                        <th>Market Type</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.predictions.map(prediction =>
                        <tr key={prediction.id}>
                            <td>{prediction.id}</td>
                            <td>{prediction.eventId}</td>
                            <td>{prediction.prediction}</td>
                            <td>{prediction.marketType}</td>
                            <td>{prediction.status}</td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>

        );
    }
}


export default ContentTable;