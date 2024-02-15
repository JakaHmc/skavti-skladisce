import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ButtonSignIn({ onClick, variant, text }) {
  return (
    <div className="d-grid gap-2 mt-5">
      <Button variant={variant} size="lg" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}
