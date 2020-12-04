//React-Router will goes here!!!
import {Layout} from 'antd';
import styled from 'styled-components/macro';
import {HomePage} from './containers/HomePage';

const {Content} = Layout;

const AppWrapper = styled(Layout)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function App() {
	return (
		<AppWrapper>
			<Content>
				<HomePage/>
			</Content>
		</AppWrapper>
	);
}
