import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutTherapy = () => {
    return (
        <section id="about-Therapy">
            <div className="container-about-therapy" style={{ backgroundColor: '#ede6e0c2' }}>
                <Container className="px-4 py-5 my-5 text-center">
                    <h4 className="display-5">About the Therapy</h4>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <p className="lead mb-4">
                                Have you noticed, when you are feeling depressed, and your favourite song happens to fall on your ears,
                                immediately a smile comes on your face? Maybe you even sing along, or tap your feet, or even dance!

                                So you know, that at least for some time, you forget your sorrows and problems just by listening to music.

                                Certain music is created according to certain times of the day. Our ancestors have done a phenomenal work in
                                music, that it is not just for entertainment, but it can change the very chemistry within us. It can make
                                you energetic, meditative, happy, sad, loving, and so on.

                                The Hindustani classical music is closely aligned with the human system. The arrangement of sounds which we call
                                as 'raga' are very impactful on our health, mind, emotions, and energy.

                                We facilitate for you, a certain set of music, that you listen to with a few instructions; which will help you
                                alleviate your suffering. By slowly working on self, you can create the experience that you desire.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default AboutTherapy;
