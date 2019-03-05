import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import { 
	getPostsByUserId,
	getUserProfile,
	followUser,
	unfollowUser,
	refreshUserProfile
} from '../../actions/profileActions'
import Post from '../Posts/Post'
import LoadingPosts from '../Posts/LoadingPosts'

const styles = {
	paper: {
		padding: 10
	},
	login: {

	},
	email: {
		color: '#888',
		marginBottom: 10
	},
	detailsBlock: {
		display: 'flex'
	},
	detail: {
		marginRight: 5,
		fontWeight: 'bold'
	},
	detailTitle: {
		marginLeft: 3,
		textTransform: 'uppercase',
		fontSize: 10,
		fontWeight: 'normal'
	},
	btnBlock: {
		width: '100%',
		textAlign: 'right'
	},
	btnFollow: {
		backgroundColor: '#9400D3',
		color: 'white',
		'&:hover': {
			color: '#9400D3',
			borderColor: '#9400D3',
			backgroundColor: 'white'
		}
	}
}

class Profile extends Component {
	constructor (props) {
		super(props)

		this.handleFollow = this.handleFollow.bind(this)
		this.handleUnfollow = this.handleUnfollow.bind(this)
	}

	componentDidMount() {
		this.props.getPostsByUserId(this.props.match.params.userId)
		this.props.getUserProfile(this.props.match.params.userId)
	}

	componentDidUpdate(prevProps) {
		if (this.props.auth.isAuthenticated) {
			if (prevProps.user && prevProps.user.following !== this.props.user.following) {
				this.props.refreshUserProfile(this.props.match.params.userId)
			}
		}
	}

	handleFollow (){
		this.props.followUser(this.props.match.params.userId)
	}

	handleUnfollow () {
		this.props.unfollowUser(this.props.match.params.userId)
	}

	render () {
		const { 
			classes,
			loadingPosts,
			loadingProfile,
			list,
			auth,
			user,
			profile 
		} = this.props
		let followBtns;
		if (auth.isAuthenticated) {
			if (
				user &&
				user.following &&
				user.following.indexOf(this.props.match.params.userId) === -1
			) {
				followBtns = (<div className={classes.btnBlock}>
					<Button 
						variant="outlined" 
						className={classes.btnFollow} 
						onClick={this.handleFollow}>
						Follow
					</Button>
				</div>)
			} else {
				followBtns = (<div className={classes.btnBlock}>
					<Button 
						variant="outlined" 
						className={classes.btnFollow}
						onClick={this.handleUnfollow}
					>
						Unfollow
					</Button>
				</div>)
			}
		}
		let items;
		items = list && list.map(el => <Post key={el._id} post={el}/>)
		let profileInfo
		if (profile && items) {
			profileInfo = (
				<Paper className={classes.paper}>
					<h1 className={classes.login}>{profile.login}</h1>
					<div className={classes.email}>{profile.email}</div>
					<div className={classes.detailsBlock}>
						<div className={classes.detail}>
							{items.length}
							<span className={classes.detailTitle}>posts</span>
						</div>
						<div className={classes.detail}>
							{profile.followers.length}
							<span className={classes.detailTitle}>followers</span>
						</div>
						<div className={classes.detail}>
							{profile.following.length}
							<span className={classes.detailTitle}>following</span>
						</div>
						{ followBtns }
					</div>
				</Paper>
			)
		}

		return (
			<div>
				{ loadingProfile ? <div>Loading</div> : profileInfo }
				{ loadingPosts ? <LoadingPosts /> : items }
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	loadingPosts: state.post.loading,
	list: state.post.list,
	profile: state.profile.user,
	loadingProfile: state.profile.loading,
	auth: state.auth,
	user: state.auth.user
})

export default connect(mapStateToProps, 
	{ 
		getPostsByUserId, 
		getUserProfile, 
		followUser, 
		unfollowUser,
		refreshUserProfile 
	})(withStyles(styles)(Profile))