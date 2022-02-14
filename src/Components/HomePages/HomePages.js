import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BannerPage from "../BannerPage/BannerPage";
import Footer from "../Footer/Footer";
import Disis from "../LandPage/Disis";
import ExploreMore from "../LandPage/ExploreMore";
import InfoPage from "../LandPage/InfoPage";

import AboutUs from "../AboutUs/AboutUs";

import "./HomePages.css";
import useAuth from "../../hooks/useAuth";
import DoctorPage from "../../Pages/doctorPage/DoctorPage";

function HomePages() {
	const { user } = useAuth();
	const [isDoctor, setIsDoctor] = useState(false)

	useEffect(() => {

		fetch(`http://localhost:5000/members?email=${user.email}`)
			.then(res => res.json())
			.then(data => setIsDoctor(data[0]?.isDoctor))
		
	
	}, [user])
	

	return (
		<>

		{
			isDoctor ? <DoctorPage/> :

			<>
			<BannerPage />
			<Container>
			<ExploreMore />
			<InfoPage />
			<AboutUs />
			<Disis />
			</Container>
			<Footer />
			
			</> 
		}
		</>
	);
}

export default HomePages;
