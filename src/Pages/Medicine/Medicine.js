import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import TimePicker from "react-time-picker";
import useAuth from "../../hooks/useAuth";

function Medicine() {
	const { user } = useAuth();
	// medicine information
	const time = new Date().toLocaleTimeString();
	const [value, onChange] = useState(time);
	const [option, setOption] = useState('Pill(s)');

	
	const initialInfo = {
		name: "",
		time: '',
		option: option,
		numberOfDose: '',
		email: user.email,
	};
	const [medicineInfo, setMedicineInfo] = useState(initialInfo);
	// console.log(medicineInfo);

	// load data
	// displaying data
	const [medicineLists, setMedicineLists] = useState([]);
	console.log(option)

	useEffect(() => {
		const url = `http://localhost:5000/medicines?email=${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setMedicineLists(data));
	}, []);

	const handleOnBlur = (e) => {
		const field = e.target.name;
		const value = e.target.value;

		const newInfo = { ...medicineInfo };
		newInfo[field] = value;
		console.log(newInfo);
		setMedicineInfo(newInfo);
	};

	// const handleDltAll = () => {
	// 	setMedicineLists({});
	// };

	const handleSubmit = (e) => {
		e.preventDefault();


		// collect data
		const newMedicineInfo = {
			...medicineInfo,
		};

		newMedicineInfo.time = value;

		console.log(newMedicineInfo);

		// send to server
		fetch("http://localhost:5000/medicines", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newMedicineInfo),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.insertedId) {
					e.target.reset();
				}
				window.location.reload();
			});
	};
	// delet an user
	const handleDelete = (id) => {
		const proceed = window.confirm("Are you sure to delete...?");
		if (proceed) {
			const url = `http://localhost:5000/medicines/${id}`;
			fetch(url, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					if (data.deletedCount > 0) {
						// window.confirm("are you sure to delete item....?");
						const remainingMedicines = medicineLists.filter(
							(item) => item._id !== id
						);
						setMedicineLists(remainingMedicines);
					}
				});
		}
	};



	return (
		<div className='container my-3'>
			<div className='mx-ao'>
				<h1 className='text-center'>Medicine</h1>
				<hr className='w-50 mx-auto' />
			</div>
			<div className='row'>
				<div className='col col-md-4 mx-auto mb-4'>
					<div>
						<div className='card-body'>
							<form onSubmit={handleSubmit} className='mx-auto'>
								<input
									className='form-control mb-3'
									name='name'
									onBlur={handleOnBlur}
									type='text'
									autocomplete="off"
									placeholder='medicine name'></input>

								<select value={option} onChange={(e) => setOption(e.target.value)} class="form-select mb-3" aria-label="Default select example">
								<option selected>Select Unit(s)</option>
								<option value="Pill(s)">Pill(s)</option>
								<option value="Capsule(s)">Capsule(s)</option>
								<option value="TableSpoon(s)">TableSpoon(s)</option>
								</select>

								<div class="mb-3">
									<input name="numberOfDose" onBlur={handleOnBlur} type="number" class="form-control" id="formGroupExampleInput" placeholder="Number of Dose"/>
								</div>

								<input
									className='form-control mb-3'
									autocomplete='off'
									name='mobile'
									onBlur={handleOnBlur}
									type='text'
									placeholder='Your Mobile'></input>
								
								<div className="mb-3"> 
									<TimePicker onChange={onChange} value={value} />
								</div>



								{/* <textarea
									className='form-control mb-3'
									name='description'
									onBlur={handleOnBlur}
									placeholder='Description'
									rows='2'></textarea> */}

								<button type='submit' class='btn btn-primary mb-3'>
									add
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				{!medicineLists.length === 0 && (
					<h2>medicines : {medicineLists.length}</h2>
				)}

				<hr />
				<table class='table table-hover'>
					{!medicineLists.length === 0 && (
						<thead>
							<tr>
								<th scope='col'>ID</th>
								<th scope='col'>Name</th>
								<th scope='col'>Description</th>
								<th scope='col'>Time</th>
								<th scope='col'>Mobile</th>
								<th scope='col'>email</th>
								<th scope='col'></th>
							</tr>
						</thead>
					)}
					<tbody>
						{medicineLists.map((item, index) => {
							console.log(item);
							return (
								<tr key={index}>
									<th scope='row'>{index + 1}</th>
									<td>{item.name}</td>
									<td>{item.numberOfDose}</td>
									<td>{item.time}</td>
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
export default Medicine;
