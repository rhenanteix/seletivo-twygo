import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

interface CourseActionsProps {
  courseId: string;
}

const CourseActions: React.FC<CourseActionsProps> = ({ courseId }) => {
  const handleEdit = () => {
    // Implementar lógica de edição
    console.log(`Edit course with id: ${courseId}`);
  };

  const handleDelete = () => {
    // Implementar lógica de exclusão
    console.log(`Delete course with id: ${courseId}`);
  };

  return (
    <HStack mt={4}>
      <Button onClick={handleEdit} colorScheme="yellow">Editar</Button>
      <Button onClick={handleDelete} colorScheme="red">Excluir</Button>
    </HStack>
  );
};

export default CourseActions;
