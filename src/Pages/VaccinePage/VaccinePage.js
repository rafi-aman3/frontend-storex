import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

function VaccinePage() {
	const { user } = useAuth();
	// vaccine information
	const [value, onChange] = useState(new Date());
	const initialInfo = {
		name: "",
		description: "",
		date: '',
		email: user.email,
	};
	const [vaccineInfo, setVaccineInfo] = useState(initialInfo);

	// load data
	// displaying data
	const [vaccineLists, setVaccineLists] = useState([]);
	useEffect(() => {
		const url = `http://localhost:5000/vaccines?email=${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setVaccineLists(data));
	}, [user]);

	const handleOnBlur = (e) => {
		const field = e.target.name;
		const value = e.target.value;

		const newInfo = { ...vaccineInfo };
		newInfo[field] = value;
		// console.log(newInfo);
		setVaccineInfo(newInfo);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// collect data
		const newVaccineInfo = {
			...vaccineInfo,
		};
		// console.log(newMedicineInfo);

		newVaccineInfo.date = value.toISOString()
		console.log(newVaccineInfo)
		// send to server
		fetch("http://localhost:5000/vaccines", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newVaccineInfo),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				if (data.insertedId) {
					// window.confirm(`are you sure.....?`);
					// clear the form
					e.target.reset();
				}
				window.location.reload();
			});
	};
	// delet an user
	const handleDelete = (id) => {
		const proceed = window.confirm("Are you sure to delete...?");
		if (proceed) {
			const url = `http://localhost:5000/vaccines/${id}`;
			fetch(url, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					if (data.deletedCount > 0) {
						// window.confirm("are you sure to delete item....?");
						const remainingVaccines = vaccineLists.filter(
							(item) => item._id !== id
						);
						setVaccineLists(remainingVaccines);
					}
				});
		}
	};

	return (
		<div className='container my-3'>
			<div className='mx-ao'>
				<h1 className='text-center'>vaccines</h1>
				<hr className='w-50 mx-auto' />
			</div>
			<div className='row'>
				<div className='col col-md-4 mx-auto mb-4'>
					<div>
						<div className='card-body'>
							<form onSubmit={handleSubmit} className='mx-auto'>
								<input
									className='form-control mb-3'
									autocomplete='off'
									name='name'
									onBlur={handleOnBlur}
									type='text'
									placeholder='vaccine name'></input>
									
									
								<textarea
									className='form-control mb-3'
									name='description'
									onBlur={handleOnBlur}
									placeholder='Description'
									rows='2'></textarea>

									<div className="mb-3">
      									<DatePicker onChange={onChange} value={value} />
    								</div>

									<input
									className='form-control mb-3'
									autocomplete='off'
									name='mobile'
									onBlur={handleOnBlur}
									type='text'
									placeholder='Your Mobile'></input>

								<button type='submit' class='btn btn-primary mb-3'>
									add
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				{!vaccineLists.length === 0 && <h2>vaccines : {vaccineLists.length}</h2>}

				<hr />
				<table class='table table-hover'>
					{!vaccineLists.length === 0 && (
						<thead>
							<tr>
								<th scope='col'>ID</th>
								<th scope='col'>Name</th>
								<th scope='col'>Description</th>
								<th scope='col'>Date</th>
								<th scope='col'>Number</th>
								<th scope='col'>email</th>
								<th scope='col'></th>
							</tr>
						</thead>
					)}
					<tbody>
						{vaccineLists.map((item, index) => {
							// console.log(item);
							return (
								<tr key={index}>
									<th scope='row'>{index + 1}</th>
									<td>{item.name}</td>
									<td>{item.description}</td>
									<td>{item.date.toLocaleString()}</td>
									<td>{item.mobile}</td>
									<td>{item.email}</td>
									<td>
										<div
											className='btn btn-sm btn-outline-danger'
											onClick={() => handleDelete(item._id)}>
											<FaTrashAlt />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default VaccinePage;

// import React from "react";
// function VaccinePage() {
// 	return (
// 		<div className='container my-3'>
// 			<div className='mx-ao'>
// 				<h1 className='text-center'>Vaccine</h1>
// 				<hr className='w-50 mx-auto' />
// 			</div>
// 			<div className='row'>
// 				<div className='col col-md-4 mx-auto mb-4'>
// 					<div>
// 						<div className='card-body'>
// 							<form className='mx-auto'>
// 								<input
// 									className='form-control mb-3'
// 									type='text'
// 									placeholder='Vaccine name'
// 									aria-label='default input example'></input>
// 								{/* <input
// 									className='form-control mb-3'
// 									type='text'
// 									placeholder='Default input'
// 									aria-label='default input example'></input> */}
// 								<textarea
// 									className='form-control mb-3'
// 									placeholder='Description'
// 									id='exampleFormControlTextarea1'
// 									rows='2'></textarea>

// 								<div className='btn btn-dark btn-sm mx-auto text-center'>
// 									add vaccine
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div className='row'>
// 				<div className='col-sm-4'>
// 					<div className='card'>
// 						<div className='card-body'>
// 							<h5 className='card-title'>Special title treatment</h5>
// 							<p className='card-text'>
// 								With supporting text below as a natural lead-in to additional
// 								content.
// 							</p>
// 							<a href='#' className='btn btn-primary'>
// 								Go somewhere
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default VaccinePage;
