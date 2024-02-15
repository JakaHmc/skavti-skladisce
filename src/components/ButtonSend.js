import React from 'react';
import Button from 'react-bootstrap/Button';


export default function ButtonSend({ onClick, variant, text }) {
    return (
      <Button size="lg" variant={variant} onClick={onClick}>{text}</Button>
    );
  }
  