import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SERVER_BASE_URL } from '../../App';
import useAuth from '../../hooks/useAuth';
import Worker from './Worker';

const Workers = () => {

    const [workers, setWorkers] = useState([]);
    const [fixedWorkers, setFixedWorkers] = useState([]);
    const [criteria, setCriteria] = useState("")

    const { service } = useParams();
    const {user} = useAuth()

    useEffect(() => {
        if (criteria != "location") {
            fetch(SERVER_BASE_URL + `/workers/${service}/${criteria}`)
                .then(res => res.json())
                .then(data => {
                    setWorkers(data.users)
                    setFixedWorkers(data.users)
                    console.log("set done")
                })
        }
    }, [criteria])

    const searchWorker = (text) => {
        const newWorkers = fixedWorkers.filter(worker => {
            if (worker.name.toLowerCase().includes(text.toLowerCase())) {
                return worker
            }
        })
        setWorkers(newWorkers)
    }

    console.log(workers)

    const setLocationCriteria = () => {
        setCriteria("location")
        setWorkers([])
        let newWorkers = [];
        fixedWorkers.forEach(worker => {
            console.log(worker)
            if(worker.address == user.address) {
                newWorkers.push(worker)
            }
        })
        fixedWorkers.forEach(worker => {
            if(worker.address != user.address) {
                newWorkers.push(worker)
            }
        })
        setWorkers(newWorkers)
    }

    return (
        <div className="container">
            <h1 className="text-center m-5">Our Best Workers</h1>
            <div className="text-center m-5">
                <button
                    className={`${criteria == "location" ? "custom-btn" : "blank-btn"} mr-3 mb-3`}
                    onClick={setLocationCriteria}
                >
                    Location
                </button>

                <button
                    className={`${criteria == "work" ? "custom-btn" : "blank-btn"} mr-3 mb-3`}
                    onClick={() => setCriteria("work")}
                >
                    Work
                </button>

                <button
                    className={`${criteria == "experience" ? "custom-btn" : "blank-btn"} mr-3 mb-3`}
                    onClick={() => setCriteria("experience")}
                >
                    Experience
                </button>

                <button
                    className={`${criteria == "price" ? "custom-btn" : "blank-btn"} mr-3 mb-3`}
                    onClick={() => setCriteria("price")}
                >
                    Price
                </button>
            </div>
            <div className="col-md-12 col-lg-6 mx-auto">
                <div className="d-flex justify-content-evenly">
                    <input
                        onChange={(e) => { searchWorker(e.target.value) }}
                        className="form-control mr-3"
                        type="text"
                        placeholder="Search worker ..."
                    />
                    <button className="custom-btn">Search</button>
                </div>
            </div>
            <div className="row">
                {
                    workers.map(worker => <Worker key={worker._id} worker={worker} />)
                }
            </div>

        </div>
    );
};

export default Workers;