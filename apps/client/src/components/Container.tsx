interface IContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: IContainerProps) => (
  <div className='flex justify-center min-h-screen bg-slate-300'>
    <div className='w-[calc(100%-50px)] mt-10'>{children}</div>
  </div>
);
