import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Register() {
	const [loginData, setLoginData] = useState({});
	const [isDoctor, setIsDoctor] = useState(false);
	const history = useHistory();
	const { user, error, registerUser, isLoading } = useAuth();

	const handleOnBlur = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const newLoginData = { ...loginData };
		newLoginData[field] = value;
		console.log(newLoginData);
		setLoginData(newLoginData);
	};

	// console.log(`email: ${loginData.email}, password : ${loginData.password}`);

	const handleRegisterSubmit = (e) => {
		if (loginData.password !== loginData.password2) {
			alert("Please enter right password");
			return;
		}

		const newLoginData = {...loginData}
		newLoginData.isDoctor = isDoctor;




		registerUser(
			newLoginData.email,
			newLoginData.password,
			newLoginData.userName,
			newLoginData.isDoctor,
			history
		);


		fetch("http://localhost:5000/members", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newLoginData),
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
		e.preventDefault()
	};

	return (
		<div className='container text-capitalize card col-lg-6 py-1 shadow mt-5'>
			<h1 className='text-center'>registration</h1>
			<hr />
			{!isLoading && (
				<form className='row mx-auto w-50 mt-2' onSubmit={handleRegisterSubmit}>
					<div className='mb-3'>
						<input
							type='text'
							name='userName'
							className='form-control'
							id='name'
							placeholder='Enter your name'
							onBlur={handleOnBlur}
						/>
					</div>

					<div className='mb-3'>
						<input
							type='email'
							name='email'
							className='form-control'
							id='email'
							placeholder='Enter your Email'
							onBlur={handleOnBlur}
						/>
					</div>

					<div className='mb-3'>
						<input
							name='password'
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							onBlur={handleOnBlur}
						/>
					</div>

					<div className='mb-3'>
						<input
							name='password2'
							type='password'
							className='form-control'
							id='password2'
							placeholder='Re-Type Password'
							onBlur={handleOnBlur}
						/>
					</div>

					<div className="mb-3">
  						<input className="form-check-input" name="isDoctor" type="checkbox" onChange={() => setIsDoctor(!isDoctor)} value={isDoctor} id="flexCheckDefault"/>
  						<label className="form-check-label" htmlFor="flexCheckDefault">
							  Doctor
  						</label>
					</div>

					<div className='col-12'>
						<button type='submit' className='btn btn-primary'>
							register
						</button>
					</div>
					{/* <Link to="/DoctorPage">
						<p classNameName="mt-4">
							Join  As Doctor
						</p>
					</Link> */}
					<Link to='/login'>
						<p className='col-12 btn btn-sm btn-outline-dark mt-3 text-capitalize'>
							allready registerd....?
							<br />
							please login
						</p>
					</Link>
				</form>
			)}
			{/* spinner */}
			{isLoading && <Spinner className='text-center' animation='border' />}
			{/* register seccess alert  */}
			{user.email && (
				<div className='alert alert-success d-flex align-items-center' role='alert'>
					<svg
						className='bi flex-shrink-0 me-2'
						width='24'
						height='24'
						role='img'
						aria-label='Success:'></svg>
					<div>Account successfully created</div>
				</div>
			)}
			{error && (
				<div className='alert alert-warning d-flex align-items-center' role='alert'>
					<svg
						className='bi flex-shrink-0 me-2'
						width='24'
						height='24'
						role='img'
						aria-label='Warning:'></svg>
					<div>{error}</div>
				</div>
			)}
		</div>
	);
}

export default Register;
