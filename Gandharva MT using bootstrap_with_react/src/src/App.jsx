
import 'bootstrap/dist/css/bootstrap.min.css';

import IntroSection from './Home/Introsection.jsx'
import AboutTherapist from './Home/AboutTherapist.jsx'
import Divider from './Home/Divider.jsx'
import AboutTherapy from './Home/AboutTherapy.jsx'
import TherapyStructure from './Home/TherapyStructure.jsx'
import TherapyBenefits from './Home/TherapyBenefits.jsx'
import Feedback from './Home/Feedback.jsx'
import RegistrationForm from './Home/Registration_form.jsx'
import Footer from './Home/Footer.jsx'
import Header from './Home/Header.jsx';

function App() {

  return (
    <>
    <Header/>
    <IntroSection/>
    <Divider/>
    <AboutTherapist/>
    <Divider/>
    <AboutTherapy/>
    <TherapyStructure/>
    <Divider/>
    <TherapyBenefits/>
    <Divider/>
    <Feedback/>
    <RegistrationForm/>
    <Footer/>
    </>
  )
}

export default App
