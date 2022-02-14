import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Base64Downloader from 'react-base64-downloader'
import { FaDownload, FaTrashAlt } from "react-icons/fa";


function AddRecord() {
  const { name } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const [image, setImage] = useState(null);
	const [description, setDescription] = useState(``);

  const [recordImgs, setRecordImgs] = useState([]);

	useEffect(() => {
		const url = `http://localhost:5000/myrecords/${name}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
        setRecordImgs(data);
      });
	}, [name]);

  const handleSubmit = (e) => {
		e.preventDefault();
		if (!image) {
			// alert(`please add aimage`);
			return;
		}
		const formData = new FormData();
		formData.append("description", description);
		formData.append("image", image);
    formData.append('name', name)

		fetch("http://localhost:5000/myrecords", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					// window.confirm(`are you sure.....?`);
					// clear the form
					e.target.reset();
					alert("image added successfully");
				}
			})
			.catch((err) => {
				console.error("Error:", err);
			});
	};

  const handleDelete = (recordId) => {
		const proceed = window.confirm("Are you sure to delete...?");
		if (proceed) {
			const url = `http://localhost:5000/myrecords/${recordId}`;
			fetch(url, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					if (data.deletedCount > 0) {
						// window.confirm("are you sure to delete item....?");
						const remainingRecordImgs = recordImgs.filter(
							(item) => item._id !== recordId
						);
						setRecordImgs(remainingRecordImgs);
					}
				});
		}
	};

  return (
    <div className='container MyRecord-container mt-2'>
			<h3 className='text-center mb-3 '>Add Record for {name}</h3>

      <button className='upload-btn' onClick={handleShow}>
				<img src='https://img.icons8.com/material-outlined/96/000000/add-image.png' />
			</button>

      {/* load doctors to display */}
			<div class='row'>
				{recordImgs.map((item, index) => {
					console.log(item);
					const { image, description, _id } = item;

					return (
						<div key={index} class='col-sm-3'>
							<div class='card text-capitalize'>
								<div className='img-container'>
									<img
										class='card-img-top'
										src={`data:image/jpeg;base64,${image}`}
										alt="myimage"
									/>
								</div>
								<div class='card-body'>
									<p class='card-text'>Doctors Comment: {description}</p>
									<Base64Downloader base64={`data:image/jpeg;base64,${image}`} downloadName={`${description}`}>
										<div className="btn btn-sm btn-outline-success">
											<FaDownload/>
										</div>
									</Base64Downloader>
									<div
										className='btn btn-sm btn-outline-danger'
										onClick={() => handleDelete(_id)}>
										<FaTrashAlt />
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

      <Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<h3>Add Report/Prescription</h3>
				</Modal.Header>
				<Modal.Body>
					<form class='row g-3' onSubmit={handleSubmit}>
						{/* file upload */}
						<div class='input-group mb-3'>
							<input
								onBlur={(e) => setImage(e.target.files[0])}
								accept='image/*'
								type='file'
								class='form-control'
							/>
						</div>

						{/* description */}
						<textarea
							onBlur={(e) => setDescription(e.target.value)}
							class='form-control'
							placeholder='Doctor Comment/Advise'
							aria-label='With textarea'></textarea>

						<button type='submit' class='btn btn-primary mb-3'>
							Add
						</button>
					</form>
				</Modal.Body>
			</Modal>
    </div>
  )
}

export default AddRecord