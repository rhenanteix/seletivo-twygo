import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseForm from './CourseForm';

describe('CourseForm', () => {
  const mockOnAddCourse = jest.fn();

  test('renders form elements', () => {
    render(<CourseForm onAddCourse={mockOnAddCourse} />);

    expect(screen.getByLabelText(/título do curso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de início/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de término/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url do vídeo/i)).toBeInTheDocument();
  });

  test('submits form data', async () => {
    render(<CourseForm onAddCourse={mockOnAddCourse} />);

    await userEvent.type(screen.getByLabelText(/título do curso/i), 'Curso Teste');
    await userEvent.type(screen.getByLabelText(/descrição/i), 'Descrição do Curso Teste');
    await userEvent.type(screen.getByLabelText(/data de início/i), '2024-10-01');
    await userEvent.type(screen.getByLabelText(/data de término/i), '2024-10-10');
    await userEvent.type(screen.getByLabelText(/url do vídeo/i), 'https://www.youtube.com/watch?v=OtK8SitTwTU');

    userEvent.click(screen.getByRole('button', { name: /adicionar curso/i }));

    expect(mockOnAddCourse).toHaveBeenCalledWith({
      title: 'Curso Teste',
      description: 'Descrição do Curso Teste',
      startDate: '2024-10-01',
      endDate: '2024-10-10',
      videoUrl: 'https://www.youtube.com/watch?v=OtK8SitTwTU',
    });
  });
});
