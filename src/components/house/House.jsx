import React, { useState } from 'react'
import Modal from '../modal/Modal'
import useForm from '../hooks/useForm';
import './house.css'

export default function House({data, loading}) {
    const [isOPen, setIsOPen] = useState(false);
    const { values, handle_change, handle_submit, error, success } = useForm({
        initialValues: {
        houseId: `${data._id}`,
        firstname: '',
        lastname: '',
        email:'',
        gender:'Male',
        }
    });
    if(loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className='house_box'>
            <div>
                <img className="house_img" src={data.img} alt="appartment img" />
            </div>
            <div className="house_main_detail">
                <p className="house_type">{data.house_type}</p>
                <p className="house_name">{data.house_name}</p>
                <p className="house_address">{data.address}</p>
            </div>
            <div className="house_sec_detail">
                <div className="house_room">
                    <p>{data.bedroom} Bedroom</p>
                    <p>{data.bathroom} Bathroom</p>
                </div>
                <p className="house_rent">$ {data.rent}<span className="house_rent_span"> / Monthly Rent</span></p>
                <button className="house_btn" onClick={()=>{setIsOPen(true)}} >Contact</button>

                <Modal open={isOPen} onClose={()=>{setIsOPen(false)}}>

                    <p className="house_name">{data.house_name}</p>
                    <p className="house_address">{data.address}</p>

                    <div className="house_input">
                        {error && <p className="errorMessage">{error.messages}</p> }
                        {success && <p className="successMessage">{success}</p>}
                        <label htmlFor="firstname">Firstname:</label>
                        <input type="text" placeholder="Enter First Name" id="firstname" value={values.firstname} name={"firstname"}
                        onChange={handle_change}/>
                        <label htmlFor="lastname">Lastname:</label>
                        <input type="text" placeholder="Enter Last Name" id="lastname" value={values.lastname} name={"lastname"}
                        onChange={handle_change}/>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Enter Email" id="email" value={values.email} name={"email"}
                        onChange={handle_change}/>
                        <label htmlFor="gender">Select Gender:</label>
                        <select id="gender" value={values.gender} onChange={handle_change} name={"gender"}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="others">Others</option>
                        </select>
                    </div>

                    <button className="house_btn" onClick={handle_submit}>Submit</button>
                </Modal>

            </div>
        </div>
    )
}
