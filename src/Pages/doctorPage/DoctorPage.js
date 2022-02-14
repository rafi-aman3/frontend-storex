import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddRecord from "../../Components/AddRecord/AddRecord";

function DoctorPage() {

	const [patients, setPatients] = useState([])

	const [search, setSearch] = useState('')

	useEffect(() => {
		if(search) {
			console.log(search)
			fetch(`http://localhost:5000/patients?s=${search}`)
			.then(res => res.json())
			.then(data => setPatients(data))
		}
	}, [search])

	


	const handleOnChange = (e) => {
		setSearch(e.target.value)
	};


	const handleLoginSubmit = (e) => {		
		e.preventDefault();
	};
	
	return (
		<div>
			<h1 className="text-center text-capitalize">doctor</h1>
			<div class='input-group mx-auto w-50'>
				<form onSubmit={handleLoginSubmit}>
					<div class='mb-3'>
					<input
					type='text'
					class='form-control'
					placeholder="Search patient"
					aria-label="Recipient's username"
					aria-describedby='basic-addon2'
					o
					onBlur={handleOnChange}
					/>
					</div>
					<button type='submit' class='btn btn-primary'>
						 Search
					</button>
				</form>
			</div>

			<hr />
				<table class='table table-hover'>
					{!patients.length === 0 && (
						<thead>
							<tr>
								<th scope='col'>Name</th>
								<th scope='col'>email</th>
							</tr>
						</thead>
					)}
					<tbody>
						{patients.map((item, index) => {
							console.log(item);
							return (
								<tr key={index} >
									<th scope='row'>{index + 1}</th>
									<td><Link to={`/addRecord/${item.userName}`}> {item.userName} </Link></td>
									<td>{item.email}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
		</div>
	);
}

export default DoctorPage;
