import { useContext } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import UserDataManager from '../components/UserDataManager';
import { AuthContext } from '../context/AuthContext';

function ProfileEditor() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Container fluid className='p-0 d-flex flex-column container-esterno'
                style={{ overflow: 'hidden', minHeight: 'calc(100vh - 134px)' }}>
                <Tab.Container id='left-tab-menu' defaultActiveKey="profilo">

                    <Row className="g-0 flex-grow-1">
                        {/* Sidebar - visibile solo su md e superiori */}
                        <Col md={1} lg={2} className="d-none d-md-block bg-light border-end"
                            style={{
                                minHeight: '100%',
                                position: 'sticky',
                                top: '80px',
                                paddingTop: '2rem'
                            }}>
                            <Nav variant='pills' className='flex-column mt-3 pb-2'>
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

                        {/* Contenuto principale */}
                        <Col xs={12} md={10} lg={9} style={{ overflow: 'hidden' }}>
                            {/* Tab selector per mobile */}
                            <div className="d-md-none bg-light border-bottom p-3" style={{ overflowX: 'auto' }}>
                                <Nav variant='pills' className='flex-row'>
                                    <Nav.Item className="flex-fill">
                                        <Nav.Link eventKey='profilo' className="text-center">Profilo</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill">
                                        <Nav.Link eventKey='sicurezza' className="text-center">Sicurezza</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill">
                                        <Nav.Link eventKey='notifiche' className="text-center">Notifiche</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill">
                                        <Nav.Link eventKey='sessioni' className="text-center">Sessioni</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>

                            {/* Contenuto delle tab */}
                            <div className="p-3"
                                style={{
                                    overflow: 'hidden'
                                }}>
                                <Tab.Content>
                                    <Tab.Pane eventKey='profilo'>
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
                            </div>
                        </Col>
                    </Row>

                </Tab.Container>
            </Container>
        </>
    )
}

export default ProfileEditor;