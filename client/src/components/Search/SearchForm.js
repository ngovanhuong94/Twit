import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { searchUser } from '../../actions/profileActions'

const styles = (theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	}
})

class SearchForm extends Component {
	constructor (props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit (e) {
		const searchData = {
			text: e.target.value
		}

		if (e.key === 'Enter') {
			this.props.searchUser(searchData, this.props.history)
		}
	}

	render () {
		const { classes } = this.props
		return (
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<SearchIcon />
				</div>
				<InputBase
					placeholder="Search user" 
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput
					}}
					onKeyPress={this.handleSubmit}
				/>
			</div>
		)
	}
}

export default connect(null, { searchUser })(withRouter(withStyles(styles)(SearchForm)))