import React from 'react'

import '../../styles/innerScreen/styles.css'

const TreeNode = ({ node, onCardClick }) => {
  if (!node || !node.user || !node.children) {
    return null;
  }
  const { user, children } = node;

  const getNodeColour = (status) => {

    switch (status) {
      case 'Active':
        return '#bdf3bd';
      case 'Inactive':
        return '#ed8585';
      case 'Dead':
        return '#999696';
      default:
        return 'default-color';
    }
  };

  const nodeColour = getNodeColour(user.status);
  const handleShowCard = () => {
    onCardClick(user);
  };

  return (
    <li>
      <div className='node-wrapper' style={ { backgroundColor: `${nodeColour}`}} onClick={handleShowCard}>
        <p>{ user.name }</p>
        <p><small>OwnId:</small> { user.own_id }</p>
        <p><small>SponsorId:</small> { user.sponsor_id }</p>
        <small style={ { color: user.position === 'Left' ? '#910303' : '#072f07' } }>{ user.position }</small>
      </div>
      <ul className='child-container' >
        { children.length > 0 && (
          <li className="child-node">
            { children.map((child, index) => (
              <TreeNode key={ index } node={ child } onCardClick={ onCardClick } />
            )) }
          </li>
        ) }
      </ul>
    </li>
  );
};

export default TreeNode;
