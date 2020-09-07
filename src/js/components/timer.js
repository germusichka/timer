class Timer {
	constructor(timer, Parameters) {
		this.timer = timer || document.querySelector('.timer')
		this.timerContent = timer.querySelector('.timer__content')
		this.timerContentItems = timer.querySelectorAll('.timer__content-item')
		this.timerMainButton = timer.querySelector('.timer__button-main')
		this.timerClearButton = timer.querySelector('.timer__button-clear')
		this.timerButtons = timer.querySelector('.timer__buttons')
		this.timerWriteButton = timer.querySelector('.timer__button-write')

		this.timeUnits = [60, 60, 10, 100]	

		if (Parameters.readOldTime) {
			this.writeTime()
		}

		this.isButtonOnlyChild()

		this.timerMainButton.addEventListener('click', () => this.toggleMainButton())
		this.timerClearButton.addEventListener('click', () => this.clearTimer())
		this.timerButtons.addEventListener('click', () => this.isButtonOnlyChild())

		if (Parameters.saveTime) {
			window.addEventListener('unload', () => this.saveTime())
		}

	}

	stopTimer() {
		this.timerMainButton.classList.replace('timer__button-stop', 'timer__button-start')

		clearInterval(this.timerInterval)
	} 

	saveTime() {
		const timerContentInnerText = new Array().map.call(this.timerContentItems, item => item.innerText)
		localStorage.removeItem('timerTime')
		localStorage.setItem('timerTime', JSON.stringify(timerContentInnerText))
	}

	writeTime() {
        if (localStorage.getItem('timerTime')) {
            console.log(localStorage.getItem('timerTime'))
            try {
                var localStorageTimerTime = JSON.parse(localStorage.getItem('timerTime'))
            } catch (error) {
                var localStorageTimerTime = new Array(this.timeUnits.length).fill(0)
                console.log(localStorageTimerTime)
            }
            for (let i = 0; i < this.timerContentItems.length; i++) {
                this.timerContentItems[i].innerText = localStorageTimerTime[i]
            }
        } else {
            console.log('there is no saved time')
        }
    }

	isButtonOnlyChild() {
		const timerDisplayButtons = new Array()
		for (let i = 0; i < this.timerButtons.children.length; i++) {
			if (!this.timerButtons.children[i].classList.contains('nonDisplay')) {
				timerDisplayButtons.push(i)
			}
		}

		if (timerDisplayButtons.length === 1) {
			this.timerButtons.children[timerDisplayButtons[0]].classList.add('--only-child')
			return true
		}
		return false
	}

	toggleMainButton() {
		if (this.timerMainButton.classList.contains('timer__button-start')) {
			this.timerMainButton.classList.replace('timer__button-start', 'timer__button-stop')
			this.timerMainButton.innerText = 'stop'
			this.timerMainButton.classList.remove('--only-child')
			this.timerClearButton.classList.remove('nonDisplay')

			this.timerInterval = window.setInterval(() => {
				let i = this.timeUnits.length - 1;
				this.timerContentItems[i].innerText++
				for (; i >= 0; i--) {
					if (this.timerContentItems[i].innerText >= this.timeUnits[i - 1]) {
						this.timerContentItems[i - 1].innerText++ 
						this.timerContentItems[i].innerText = 0
						continue
					}

					break
				}
			}, this.timeUnits[this.timeUnits.length - 1])
		} else {
			this.stopTimer()
			this.timerMainButton.innerText = 'continue'
		}
	}

	clearTimer() {
		this.stopTimer()
		for (let timerContentItem of this.timerContentItems) {
			timerContentItem.innerText = 0
		}
		this.timerMainButton.innerText = 'start'
		this.timerClearButton.classList.add('nonDisplay')
	}

}

export default Timer
