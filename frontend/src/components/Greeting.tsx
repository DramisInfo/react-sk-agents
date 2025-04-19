import React from 'react';

/**
 * Greeting component displays a welcome message.
 * @param props - The props for the Greeting component.
 */
export interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="text-xl font-medium text-blue-700" data-testid="greeting">
      Hello, {name}!
    </div>
  );
};

export default Greeting;
