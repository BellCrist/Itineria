import { useContext } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import UserDataManager from '../components/UserDataManager';
import { AuthContext } from '../context/AuthContext';

function ProfileEditor() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Container fluid className='p-0'>
                <Tab.Container id='left-tab-menu' defaultActiveKey="profilo">
                    <Row>
                        <Col md={2} lg={3} className="bg-light border-end sticky-md-top"
                            style={{
                                minHeight: '100vh',
                                position: 'sticky',
                                top: 0,
                                paddingTop: '2rem'
                            }}>
                            <Nav variant='pills' className='flex-md-column flex-row overflow-auto flex-nowrap mt-3 pb-2'>
                                <Nav.Item>
                                    <Nav.Link eventKey='profilo'>Informazioni personali</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='sicurezza'>Sicurezza e password</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='notifiche'>Preferenze notifiche</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='sessioni'>Sessioni attive</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col md={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey='profilo'>
                                    <h3>Informazioni personali</h3>
                                    {user ? (
                                        <UserDataManager />
                                    ) : (
                                        <p>Caricamento informazioni utente...</p>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey='sicurezza'>
                                    <h3>Inserire componente per la gestione password e sicurezza</h3>
                                </Tab.Pane>
                                <Tab.Pane eventKey="notifiche">
                                    <h3>Notifiche</h3>
                                    <p>Scegli quali email vuoi ricevere.</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="sessioni">
                                    <h3>Sessioni</h3>
                                    <p>Visualizza i dispositivi da cui sei collegato.</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    )
}

export default ProfileEditor;