interface IContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: IContainerProps) => (
  <div className='flex justify-center max-h-[calc(100vh-120px)] bg-base-dark-3'>
    <div className='w-[calc(100%-50px)] max-w-8xl'>{children}</div>
  </div>
);
