import React from "react";
import { connect } from "react-redux";
import { INewsState } from "../../common/interfaces";
import { ListGroup } from "react-bootstrap";
import { getNews } from "../../actions/newsAction";

interface IProps {
    getNews: () => void;
    news: any;
}

interface IState {
    // wasChanged: boolean;
}

class Game extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.props.getNews();
    }

    render(): React.ReactNode {
        console.log(this.props.news);
        return (

            <ListGroup className="page-container">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
        );
    }
}

const mapStateToProps = (state: INewsState) => {
    return {
        news: state.newsList,
    };
};

export default connect(mapStateToProps, { getNews })(Game);