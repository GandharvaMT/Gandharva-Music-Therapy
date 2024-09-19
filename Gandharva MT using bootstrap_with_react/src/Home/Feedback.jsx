import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import user from '../imgs/user-01.png';

function Feedback() {
  const [feedback1Expanded, setFeedback1Expanded] = useState(false);
  const [feedback2Expanded, setFeedback2Expanded] = useState(false);

  const toggleFeedback = (feedbackId) => {
    if (feedbackId === 'feedback1') {
      setFeedback1Expanded(!feedback1Expanded);
    } else {
      setFeedback2Expanded(!feedback2Expanded);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center pb-3">Feedback</h2>
      <Row justifyContentCenter>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <Image
                  src= {user}
                  alt="User Icon"
                  roundedCircle
                  style={{ width: 25, height: 25 }}
                  className="me-2"
                />
                <Card.Text>
                  Mrs. Sushama Joshi{' '}
                  <span style={{ textDecoration: 'underline' }}></span>
                </Card.Text>
              </Card.Title>
              <Card.Text>
                A woman in her 50's faces certain physical, mental and
                emotional upheavals or disturbances. Cannot figure out a
                solution on mental and emotional suffering. In such a
                condition, I happened to meet Adit.
                {feedback1Expanded && (
                  <>
                    {' '}He gently understood my mental turmoil and suggested
                    listening to specific ragas at specific times. I thought
                    it would be difficult to set aside time each day, but he
                    made a flexible schedule for me to listen to music. I had
                    no idea about music therapy; I started listening as an
                    experiment. Gradually, I felt mental peace and
                    introspection. I am grateful to Adit from the bottom of
                    my heart.
                  </>
                )}
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => toggleFeedback('feedback1')}
                >{feedback1Expanded ? 'Read Less...' : 'Read More...'}
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <Image
                  src= {user}
                  alt="User Icon"
                  roundedCircle
                  style={{ width: 25, height: 25 }}
                  className="me-2"
                />
                <Card.Text>
                  Sonali Argal{' '}
                  <span style={{ textDecoration: 'underline' }}></span>
                </Card.Text>
              </Card.Title>
              <Card.Text>
                I experienced insomnia, anxiety, and daily headaches.
                However, after undergoing music therapy, I have noticed
                significant improvements.
                {feedback2Expanded && (
                  <>
                    {' '}My sleep schedule has normalized, and listening to music
                    induces a soothing and relaxing effect. Moreover, my
                    anxiety levels have decreased noticeably, and the intensity
                    of my headaches has also reduced. Music therapy has proven
                    to be remarkably effective in alleviating these symptoms,
                    contributing positively to my overall well-being.
                  </>
                )}
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => toggleFeedback('feedback2')}
                >
                  {feedback2Expanded ? 'Read Less...' : 'Read More...'}
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;