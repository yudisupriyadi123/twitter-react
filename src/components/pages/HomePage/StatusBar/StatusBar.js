import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTweet } from '../../../../redux/tweet/action';
import { Container, Row, Col } from 'react-bootstrap';
import './StatusBar.module.scss';
import PhotoProfile from '../../../shared/PhotoProfile';
import RoundedButton from '../../../shared/RoundedButton';
import TweetEditor from '../../../shared/TweetEditor/TweetEditor';
import LetterCounter from './LetterCounter';

class StatusBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { tweet: '', success: false };
	}

	handleChange(tweet) {
		this.setState({ tweet });
	}

	handleSubmit() {
		this.props.addTweet(this.state.tweet).then(response => {
			if (response.status !== 200) { /* TODO: handle error API */ }
			if (response.status === 200) { this.setState({ tweet: '' }) }
		});
	}

	render() {
		const { tweet } = this.state;
		return (
			<Container styleName="container">
				<Row>
					<Col md={3} className="text-center"><PhotoProfile size={52} /></Col>
					<Col md={9} style={{marginLeft: '-20px'}}>
						<TweetEditor tweet={tweet} placeholder="What's Happening?" onChange={this.handleChange} />
					</Col>
				</Row>
				<Row>
					<Col md={3}>{/* intentionally empty */}</Col>
					<Col md={6} style={{marginLeft: '-20px'}}><LetterCounter tweet={tweet} /></Col>
					<Col md={3}><RoundedButton onClick={this.handleSubmit}>Tweet</RoundedButton></Col>
				</Row>
			</Container>		
		);
	}
}

StatusBar.propTypes = {
}

export default connect(null, { addTweet })(StatusBar);