import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Card } from 'antd';
import 'antd/dist/reset.css';
import { get } from './apiClient';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [path,] = useState("/doctors");
    useEffect(() => {
        fetchData();

    }, []);

    const fetchData = async () => {
        try {
            get(path)
            .then((response) => {
                // Handle successful response
                setData(response.users);
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching data:', error);
            });

        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleSearch = async (buttonId) => {

        try {
            var searchName = searchValue;
            if (buttonId === 1) {
                searchName = searchValue + "&category=1";

            } else if (buttonId === 3) {
                searchName = '';
                setSearchValue('');
            }
          
            get(path+'?name=' + searchName)
            .then((response) => {
                // Handle successful response
                setData(response.users);
            })
            .catch((error) => {
                // Handle error
                console.error('Error fetching data:', error);
            });

        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    
    return (
        <div>
                       
            <div className="App">
                <h1>Doctor Profile Details</h1>'
                
            <div>
            <Row gutter={16}>
            <Col span={6}>
                <Input
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                /></Col>
                <Col span={6}>
                <Row>
                    
                <Button type="primary" onClick={() => handleSearch(0)}>
                    By Doctor
                </Button>
                <Button type="primary" onClick={() => handleSearch(1)}>
                    By Hospital
                </Button>
                <Button type="primary" onClick={() => handleSearch(3)}>
                    Clear
                </Button>
                </Row>
            </Col>
            <Col span={12}>
            <Row gutter={16}>
                {data.map((profile, index) => (
                    <Card key={index} style={{ background: '#f0f0f0', padding: '20px', width: '40%' , marginBottom: 16, marginRight: 16 }}>
                        <img src="/images/doc.jpeg" alt={profile.name} style={{ width: '40%' }} />
                        <h3>{profile.name}</h3>
                        <p>Speciality {profile.speciality}</p>
                        <p>{profile.country}</p>
                        <p>Hospital {profile.hospital}</p>
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


export default Home;