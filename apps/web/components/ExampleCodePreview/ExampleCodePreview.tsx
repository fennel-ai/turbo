import styled from '@emotion/styled';
import { Sidebar } from './Sidebar';
import { Syntax } from 'ui';

const Root = styled.div`
    border: 1px solid hsla(0, 0%, 7%, 4%);
    width: 100%;
    height: 33.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: stretch;
    padding: 0.25rem;
    background-color: hsla(0, 0%, 100%, 81%);
    background-image: linear-gradient(hsla(0, 0%, 7%, 1%),  hsla(0, 0%, 7%, 1%));
    box-shadow: 0px 93px 56px rgba(43, 39, 100, 0.02), 0px 41px 41px rgba(43, 39, 100, 0.03), 0px 10px 23px rgba(43, 39, 100, 0.03);
    display: grid;
    grid-template-columns: 12.5rem 1fr;
    grid-auto-rows: 1fr;
    gap: 0.25rem;
`;

const Content = styled.div`
    background-color: hsla(0, 0%, 98%, 70%);
    border-radius: calc(1rem - 0.25rem);
    width: 100%;
    height: 100%;
    border: 1px solid hsla(0, 0%, 7%, 4%);
    overflow: scroll;
`;

const Toolbar = styled.div`
    height: 3rem;
    border-bottom: 1px solid hsla(0, 0%, 7%, 4%);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: hsla(0, 0%, 98%, 81%);
    backdrop-filter: blur(12px);
`;

const Code = styled.div`
    overflow: hidden;
`;

const CodeHighlight = styled(Syntax)`
	code[class*="language-"],
    pre {
		background: transparent;
        color: rgb(${({ theme }) => theme.ref.grey['110']}) !important;
	}

    .linenumber {
        color: #121212;
        opacity: 35%;
    }

    /* Syntax tokens */
	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: rgb(${({ theme }) => theme.ref.grey['110']}) !important;
		opacity: 56%;
	}

	.namespace {
		opacity: .7;
	}

	.token.keyword,
	.token.builtin {
		color: rgb(${({ theme }) => theme.ref.purple['80']});
	}

	.token.class-name {
		color: rgb(${({ theme }) => theme.ref.blue['90']});
	}

	.token.function,
	.token.symbol,
	.token.regex,
	.token.variable,
	.token.constant {
		color: rgba(${({ theme }) => theme.ref.green['90']});
	}

	.token.boolean {
		color: ${({ theme }) => theme.syntax.boolean};
	}

	.token.number,
	.token.important {
		color: rgb(${({ theme }) => theme.ref.red['70']}) !important;
	}

	.token.string,
	.token.char,
	.token.url {
		color: rgb(${({ theme }) => theme.ref.purple['60']}) !important;
	}

	.token.operator { 
		color: ${({ theme }) => theme.syntax.operator};
	}

	.token.property {
        color: rgb(${({ theme }) => theme.ref.grey['110']}) !important;
	}

	.token.punctuation:not(.decorator) {
		color: rgb(${({ theme }) => theme.ref.grey['80']}) !important;
	}

	.token.decorator.annotation.punctuation {
		color: rgb(${({ theme }) => theme.ref.green['90']}) !important;
	}
`;

const codeStr = `@meta(owner="test@test.com")
@featureset
class UserFeatures:
    userid: int = feature(id=1)
    name: str = feature(id=2)
    country_geoid: int = feature(id=3)
    # The users age
    age: int = feature(id=4).meta(owner="aditya@fennel.ai")
    age_squared: int = feature(id=5)
    age_cubed: int = feature(id=6)
    is_name_common: bool = feature(id=7)

    @extractor(depends_on=[UserInfoDataset])
    @inputs(userid)
    @outputs(age, name)
    def get_user_age_and_name(cls, ts: pd.Series, user_id: pd.Series):
        df, _found = UserInfoDataset.lookup(ts, user_id=user_id)
        return df[["age", "name"]]

    @extractor
    @inputs(age, name)
    @outputs(age_squared, age_cubed, is_name_common)
    def get_age_and_name_features(
        cls, ts: pd.Series, user_age: pd.Series, name: pd.Series
    ):
        is_name_common = name.isin(["John", "Mary", "Bob"])
        df = pd.concat([user_age**2, user_age**3, is_name_common], axis=1)
        df.columns = [
            str(cls.age_squared),
            str(cls.age_cubed),
            str(cls.is_name_common),
        ]
        return df`;

export const ExampleCodePreview = () => {
    return (
        <Root>
            <Sidebar>
                Hello from Sidebar
            </Sidebar>
            <Content>
                <Toolbar>
                    Toolbar
                </Toolbar>
                <Code>
                    <CodeHighlight language="python" code={codeStr} />
                </Code>
            </Content>
        </Root>
    )
};