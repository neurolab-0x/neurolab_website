import { render, screen } from '@testing-library/react'
import { Header } from '@/components/header'
describe('Header Component', () => {
  it('renders the header component', () => {
    render(<Header />)
    // Add your assertions here
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
