import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

interface CourseActionsProps {
  courseId: string;
  onEdit: () => void; 
  onDelete: (courseId: string) => void; 
}

const CourseActions: React.FC<CourseActionsProps> = ({ courseId, onEdit, onDelete }) => {
  return (
    <HStack mt={4}>
      <Button onClick={onEdit} colorScheme="yellow">Editar</Button>
      <Button onClick={() => onDelete(courseId)} colorScheme="red">Excluir</Button>
    </HStack>
  );
};

export default CourseActions;
