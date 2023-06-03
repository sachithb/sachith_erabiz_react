import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Card, Modal, DatePicker } from 'antd';
import 'antd/dist/reset.css';
import { get, post } from './apiClient';

const Appointment = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [appointmentId, setAppointmentId] = useState();
    const [path,] = useState("/appointment");
    const [pathBooking,] = useState("/booking");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            get(path)
                .then((response) => {
                    // Handle successful response
                    setData(response.appointments);
                })
                .catch((error) => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });

        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    const getCardColor = (condition) => {

        if (condition === 0) {
            return '#f0f0f0'; // Set the background color to  when the condition is true
        } else {
            return '#C77C6C'; // Set the background color to when the condition is false
        }
    };

    const handleClick = (e) => {

        setAppointmentId(e.id)
        setVisible(true);
    }
    const handleModalOk = () => {
        var raw = JSON.stringify({
            "name": "booking",
            "appointment_id": appointmentId
        });
        try {
            post(pathBooking, raw)
                .then((response) => {
                    fetchData();
                    setVisible(false);
                })
                .catch((error) => {
                    // Handle error
                    console.error('Error fetching data:', error);

                });
        } catch (error) {

            console.log('Error fetching data:', error);
        }

    };

    const handleModalClose = () => {
        setVisible(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSearch = async () => {
        if(selectedDate !== null)
        {
        get(path+'?date=' + selectedDate.format('YYYY-MM-DD'))
        .then((response) => {
            // Handle successful response
            setData(response.appointments);
        })
        .catch((error) => {
            // Handle error
            console.error('Error fetching data:', error);
        });
    }
    else{
        fetchData();
    }
    };
    const handleSearchClear = () => {
        setSelectedDate(null);
        fetchData();
    };
    return (
        <div>

            <div className="App">
                <h1>Appointment Details</h1>'

                <div className="search-bar">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Row gutter={16}>
                                <Card>
                                    <DatePicker onChange={handleDateChange} />
                                    <Button onClick={handleSearch}>Search</Button>
                                    <Button onClick={handleSearchClear}>Clear</Button>
                                </Card>
                            </Row>
                            <Modal
                                visible={visible}
                                onCancel={handleModalClose}
                                onOk={handleModalOk}

                            >
                                {/* Popup content */}
                                <p>Please Confirm Booking.</p>
                            </Modal>
                        </Col>
                        <Col span={12}>
                            <Row gutter={16}>
                                {data.map((appointment, index) => (
                                    <Card key={index} style={{ background: getCardColor(appointment.isBooked), padding: '20px', width: '40%', marginBottom: 16, marginRight: 16 }}>
                                        <img src="/images/doc.jpeg" alt={appointment.doctor} style={{ width: '40%' }} />

                                        <h3>{appointment.doctor}</h3>
                                        {(appointment.isBooked === 0) && <Button type="primary" onClick={() => handleClick(appointment)}>Booking</Button>}
                                        <p>Hospital( {appointment.hospital}) - speciality( {appointment.speciality})</p>
                                        <p>{appointment.schedule_date} - {appointment.start_time} - {appointment.end_time}</p>

                                    </Card>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    );
};


export default Appointment;