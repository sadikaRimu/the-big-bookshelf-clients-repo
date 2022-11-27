import React from 'react';
import img from '../../assets/images/History.PNG';

const About = () => {
    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={img} alt='' className="w-full rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold">War History</h1>
                            <p className="py-6"> war, in the popular sense, a conflict between political groups involving hostilities of considerable duration and magnitude. In the usage of social science, certain qualifications are added. Sociologists usually apply the term to such conflicts only if they are initiated and conducted in accordance with socially recognized forms. They treat war as an institution recognized in custom or in law. Military writers usually confine the term to hostilities in which the contending groups are sufficiently equal in power to render the outcome uncertain for a time. Armed conflicts of powerful states with isolated and powerless peoples are usually called pacifications, military expeditions, or explorations; with small states, they are called interventions or reprisals; and with internal groups, rebellions or insurrections. Such incidents, if the resistance is sufficiently strong or protracted, may achieve a magnitude that entitles them to the name “war.” repudiandae et a id nisi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;