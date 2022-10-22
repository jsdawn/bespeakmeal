import { useNavigate } from 'react-router-dom';
import { FloatingBall } from 'react-vant';
import { Revoke } from '@react-vant/icons';

function FloatingAction() {
  const navigate = useNavigate();

  return (
    <FloatingBall
      offset={{ right: 20, bottom: 20 }}
      adsorb={{ distance: 20 }}
      style={{ '--rv-floating-ball-size': '40px' }}
    >
      <div className="floating-box" onClick={() => navigate(-1)}>
        <Revoke fontSize="22px" />
      </div>
    </FloatingBall>
  );
}

export default FloatingAction;
