import React, { Component } from 'react'
import { GoX } from 'react-icons/lib/go'

export default ({ stamp, deleteHandler, positionChangeHandler, id }) => {

	return (
		<div className="timestamp">
			<h3>{stamp.timestamp}</h3>
			<select onChange={(e) => positionChangeHandler(id, e.target.value)}>
				<option value={0}>Top Left</option>
				<option value={1}>Top Right</option>
				<option value={2}>Bottom Left</option>
				<option value={3}>Bottom Right</option>
			</select>
			<GoX className="delete-icon" onClick={() => deleteHandler(id)} /> 
		</div>
	)
}