import { render, screen, fireEvent } from '@testing-library/react';
import CourseList from './CourseList';
import { Course } from '../types';

describe('CourseList', () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Curso Teste',
      description: 'Descrição do Curso Teste',
      startDate: '2024-10-01',
      endDate: '2024-10-10',
      videoUrl: 'https://www.youtube.com/watch?v=OtK8SitTwTU',
    },
  ];

  const mockOnAddOrEditCourse = jest.fn();
  const mockOnDeleteCourse = jest.fn();

  test('renders courses', () => {
    render(<CourseList courses={courses} />);

    expect(screen.getByText(/curso teste/i)).toBeInTheDocument();
  });

  test('handles adding a course', () => {
    render(<CourseList courses={[]} />);

    fireEvent.change(screen.getByLabelText(/título do curso/i), { target: { value: 'Novo Curso' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição do Novo Curso' } });
    fireEvent.change(screen.getByLabelText(/data de início/i), { target: { value: '2024-11-01' } });
    fireEvent.change(screen.getByLabelText(/data de término/i), { target: { value: '2024-11-10' } });
    fireEvent.change(screen.getByLabelText(/url do vídeo/i), { target: { value: 'https://www.youtube.com/watch?v=OtK8SitTwTU' } });

    fireEvent.click(screen.getByRole('button', { name: /adicionar curso/i }));

    expect(mockOnAddOrEditCourse).toHaveBeenCalled();
  });
  test('handles delete a course', () => {
    render(<CourseList courses={[]} />);

    fireEvent.change(screen.getByLabelText(/título do curso/i), { target: { value: 'Novo Curso' } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição do Novo Curso' } });
    fireEvent.change(screen.getByLabelText(/data de início/i), { target: { value: '2024-11-01' } });
    fireEvent.change(screen.getByLabelText(/data de término/i), { target: { value: '2024-11-10' } });
    fireEvent.change(screen.getByLabelText(/url do vídeo/i), { target: { value: 'https://www.youtube.com/watch?v=OtK8SitTwTU' } });

    fireEvent.click(screen.getByRole('button', { name: /adicionar curso/i }));

    expect(mockOnDeleteCourse).toHaveBeenCalled();
  });
});
