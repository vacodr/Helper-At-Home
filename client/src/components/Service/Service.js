import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Service = ({ service }) => {

    const { user } = useAuth();

    const { img, title, category, description } = service
    return (
        <div className="box text-center">
            {
                user.role == "worker" ?
                    <div
                        to={`/workers/${title}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <div className="box-image">
                            <img src={img} alt="" />
                        </div>
                        <div className="box-content">
                            <h2 className="box-header">{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                    :
                    <Link
                        to={`/workers/${title}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <div className="box-image">
                            <img src={img} alt="" />
                        </div>
                        <div className="box-content">
                            <h2 className="box-header">{title}</h2>
                            <p>{description}</p>
                        </div>
                    </Link>
            }
        </div>
    );
}

export default Service;