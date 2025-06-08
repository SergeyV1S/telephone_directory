interface IContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: IContainerProps) => (
  <div className='flex justify-center min-h-screen bg-base-dark-3'>
    <div className='w-[calc(100%-50px)] mt-10 max-w-[1920px]'>{children}</div>
  </div>
);
