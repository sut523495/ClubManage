package project.club.backend.entity;

import lombok.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@ToString
@EqualsAndHashCode
//@Table(name="Incomes")

public class Budget {
	@Id
    @SequenceGenerator(name = "budgets_seq", sequenceName = "budgets_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "budgets_seq")
    @Column(name="Budgets_ID")
	private @NonNull Long budgetId;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Club.class)
    @JoinColumn(name = "Club_ID", insertable = true)
	private Club club;

	private @NonNull int income;
	
	private @NonNull int pay;

	@JsonFormat(pattern="dd-MM-yyyy")
	private @NonNull LocalDate date;

	private @NonNull String detail;

	public Budget(){}

	public Budget (Club club, int income, int pay, LocalDate date, String detail){
		this.club = club;
		this.income = income;
		this.pay = pay;
		this.date = date;
		this.detail = detail;
    }
	
	public Long getBudgetId(){
		return budgetId ;
	}

	public void setBudgetId(Long budgetId) {
        this.budgetId = budgetId;
	}
	
	public int getIncome(){
		return income ;
	}

	public void setIncome(int income) {
        this.income = income;
    }
    public int getPay(){
		return pay ;
	}

	public void setPay(int pay) {
        this.pay = pay;
	}
	
	public LocalDate getdate(){
		return date ;
	}

	public void setDate(LocalDate date) {
        this.date = date;
	}

	public String getdetail(){
		return detail ;
	}

	public void setdetail(String detail) {
        this.detail = detail;
	}

	public Club getClub() {
		return this.club;
	}
	public void setClub(Club club) {
		this.club = club;
	}
}
