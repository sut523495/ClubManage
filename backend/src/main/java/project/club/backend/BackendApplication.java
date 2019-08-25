﻿package project.club.backend;
import project.club.backend.entity.*;
import project.club.backend.repository.*;
import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.text.SimpleDateFormat;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	ApplicationRunner init(MemberStatusRepository memberStatusRepository, RankRepository rankRepository,
							PositionRepository positionRepository, ClubRepository clubRepository,
							TypeClubRepository typeClubRepository, AdviserRepository adviserRepository,
							MemberRepository memberRepository, UsernameRepository usernameRepository,
							BudgetRepository budgetRepository, MemberClubRepository memberClubRepository){
		return args -> {
			Stream.of("admin","member").forEach(rank -> {
				Rank newRank = new Rank(rank);
				rankRepository.save(newRank);
			});

			Stream.of("ประธานชมรม","รองประธานชมรม","เลขานุการ","เหรัญญิก","นายทะเบียน","ประชาสัมพันธ์",
						"พัสดุ","สมาชิก").forEach(position -> {
				Position newPosition = new Position(position);
				if(position == "สมาชิก") {
					newPosition.setRank(rankRepository.findById(2));
					positionRepository.save(newPosition);
				}
				else {
					newPosition.setRank(rankRepository.findById(1));
					positionRepository.save(newPosition);
				}
			});

			Stream.of("รอการตอบรับ","เป็นสมาชิก").forEach(memberStatus -> {
				MemberStatus newMemberStatus = new MemberStatus(memberStatus);
				memberStatusRepository.save(newMemberStatus);
			});

			Stream.of("ดนตรี","ศาสนา","กีฬา","อาหาร","เพื่อสังคม","เทคโนโลยี","วัฒนธรรม",
						"อื่นๆ").forEach(TypeClub -> {
				TypeClub newTypeClub = new TypeClub(TypeClub);
				typeClubRepository.save(newTypeClub);
			});
			//------------ Adviser -------------------------
			Adviser adviser1 = new Adviser("","","");
			adviserRepository.save(adviser1);
			Adviser adviser2 = new Adviser("","","");
			adviserRepository.save(adviser2);

			//------------- Club ----------------------------
			Club club1 = new Club("ชมรมดนตรีสากล","กลุ่มดนตรีสากล","ดนตรีสากล","มาเล่นดนตรีกันเถอะ!",adviser1,typeClubRepository.findById(1));
			clubRepository.save(club1);
			Club club2 = new Club("ชมรมสมาธิ","กลุ่มชมรมนั่งสมาธิ","ชมรมนั่งสมาธิ","มานั่งสมาธิกันเถอะ!",adviser2,typeClubRepository.findById(2));
			clubRepository.save(club2);
			Club club3 = new Club("ชมรมเทนนิส","กลุ่มตีเทนนิส","ชมรมเทนนิส","มาตีเทนนิสกันเถอะ!",adviser2,typeClubRepository.findById(3));
			clubRepository.save(club3);

			//------------------ Member --------------------
			Member member1 = new Member("B5912345","นางสาวมณี แก้วก้าว","แก้ว","sut","ฝันให้ไกล ไปให้ถึง","0814587589","แนางม่จ้า แก้วก้าว","097654321","Mimi Mumu");
			memberRepository.save(member1);
			Username username1 = new Username("test","12345678",member1);
			usernameRepository.save(username1);

			//----------------------- Budget ----------------------
			Club club = clubRepository.findById(1);
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse("2019-08-12");
			Budget  budget1 = new Budget(club,10000,0,date1,"งบประจำภาคการศึกษา");
			budgetRepository.save(budget1);

			Date date2 = new SimpleDateFormat("yyyy-MM-dd").parse("2019-08-14");
			Budget  budget2 = new Budget(club,0,200,date2,"ซื้อขนมกิจกรรม");
			budgetRepository.save(budget2);
		//-------------------- MemberClub -------------------
        	Position position1 = positionRepository.findById(8);
        	MemberStatus status1 = memberStatusRepository.findById(1);
			MemberClub memberClub1 = new MemberClub("อยากเล่นดนตรี",position1,status1,club1,member1);
			memberClubRepository.save(memberClub1);

        	Position position2 = positionRepository.findById(1);
        	MemberStatus status2 = memberStatusRepository.findById(2);
			MemberClub memberClub2 = new MemberClub("อยากจิตใจสงบ",position2,status2,club2,member1);
			memberClubRepository.save(memberClub2);
		};
	}
}
