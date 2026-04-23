import { Card, Empty, message, Space, Typography } from 'antd';
import Button from 'antd/es/button';
import { JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { VokabelnController } from './controller';

const { Text, Title } = Typography;

export class VokabelnComponent extends ReactComponent<unknown, VokabelnController> implements GenericComponent {
	public readonly ctrl: VokabelnController = new VokabelnController();
	private showAnswer = false;
	private isReverseDirection = Math.random() >= 0.5;

	private randomizeDirection(): void {
		this.isReverseDirection = Math.random() >= 0.5;
	}

	public render(): JSX.Element {
		const currentEntry = this.ctrl.getCurrentEntry();
		const prompt = this.isReverseDirection ? currentEntry?.answer : currentEntry?.question;
		const solution = this.isReverseDirection ? currentEntry?.question : currentEntry?.answer;
		return (
			<div>
				<h1>Vokabeln trainieren</h1>
				{!currentEntry && (
					<Card>
						<Empty
							description="Noch keine Vokabeln hinterlegt. Bitte im Profil eine Wortliste speichern."
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					</Card>
				)}
					{currentEntry && (
						<Card>
							<Space direction="vertical" size="middle" style={{ width: '100%' }}>
							<Title level={4}>Übersetze</Title>
							<Text strong>{prompt}</Text>
							{this.showAnswer && (
								<>
									<Title level={5}>Antwort</Title>
									<Text>{solution}</Text>
								</>
							)}
								<Button
									type="primary"
									onClick={() => {
										if (this.showAnswer) {
											this.showAnswer = false;
											this.ctrl.nextEntry();
											this.randomizeDirection();
										} else {
											this.showAnswer = true;
											message.info('Antwort eingeblendet.');
										}
										this.forceUpdate();
									}}
								>
									{this.showAnswer ? 'Nächste Vokabel' : 'Antwort anzeigen'}
								</Button>
							</Space>
						</Card>
					)}
			</div>
		);
	}
}
